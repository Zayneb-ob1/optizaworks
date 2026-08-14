"use client";

import { CheckCircle2, ChevronDown, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import {
  deleteResourceAction,
  saveResourceAction,
} from "@/backend/admin/content-actions";
import { initialAdminActionState } from "@/shared/admin/action-state";
import {
  resourceDefinitions,
  type AdminField,
  type AdminResource,
} from "@/shared/admin/resources";
import type { AdminRow } from "@/shared/admin/types";

type AdminResourceManagerProps = {
  resource: AdminResource;
  rows: AdminRow[];
  organizationOptions?: { label: string; value: string }[];
};

const inputClass =
  "w-full rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-3 text-sm text-primary outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/10";

function displayValue(row: AdminRow | undefined, key: string) {
  const value = row?.[key];
  return value === null || value === undefined ? "" : String(value);
}

function ReadOnlyResourceDetails({
  resource,
  row,
}: {
  resource: AdminResource;
  row: AdminRow;
}) {
  const definition = resourceDefinitions[resource];

  return (
    <div className="rounded-2xl bg-neutral-50 p-4 sm:p-6">
      <div className="rounded-2xl border border-accent/15 bg-white px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Source-managed record
        </p>
        <p className="mt-1 text-xs leading-5 text-neutral-500">
          This published entry is managed by the website content catalog and is shown here read-only.
        </p>
      </div>
      <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {definition.fields.map((field) => {
          const value =
            field.type === "checkbox"
              ? row[field.name]
                ? "Yes"
                : "No"
              : displayValue(row, field.name) || "—";

          return (
            <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                {field.label}
              </dt>
              <dd className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-6 text-primary">
                {value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function ResourceField({
  field,
  row,
  organizationOptions,
}: {
  field: AdminField;
  row?: AdminRow;
  organizationOptions?: { label: string; value: string }[];
}) {
  const current = displayValue(row, field.name);
  const options =
    field.name === "organizationId" ? organizationOptions ?? [] : field.options ?? [];

  if (field.type === "checkbox") {
    const defaultChecked = row ? Boolean(row[field.name]) : field.name === "published";
    return (
      <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-3">
        <input
          type="checkbox"
          name={field.name}
          defaultChecked={defaultChecked}
          className="h-4 w-4 rounded border-primary/20 accent-purple-700"
        />
        <span className="text-sm font-medium text-primary">{field.label}</span>
      </label>
    );
  }

  return (
    <label className={`block ${field.wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-sm font-medium text-primary">
        {field.label}
        {field.required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}
      </span>
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          required={field.required}
          defaultValue={current}
          rows={field.name === "summary" ? 3 : 5}
          placeholder={field.placeholder}
          className={`${inputClass} resize-y`}
        />
      ) : field.type === "select" ? (
        <select
          name={field.name}
          required={field.required}
          defaultValue={current || field.options?.[0]?.value || ""}
          className={inputClass}
        >
          {!field.required && <option value="">None</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          type={field.type === "url" ? "url" : field.type}
          required={field.required}
          defaultValue={current || (field.type === "number" ? "0" : "")}
          placeholder={field.placeholder}
          min={field.type === "number" ? 0 : undefined}
          className={inputClass}
        />
      )}
      {field.help && <span className="mt-1.5 block text-xs leading-5 text-neutral-500">{field.help}</span>}
    </label>
  );
}

function ResourceForm({
  resource,
  row,
  organizationOptions,
}: {
  resource: AdminResource;
  row?: AdminRow;
  organizationOptions?: { label: string; value: string }[];
}) {
  const router = useRouter();
  const definition = resourceDefinitions[resource];
  const [state, action, pending] = useActionState(saveResourceAction, initialAdminActionState);

  useEffect(() => {
    if (state.ok) router.refresh();
  }, [router, state.ok]);

  return (
    <form action={action} className="mt-6 border-t border-primary/10 pt-6">
      <input type="hidden" name="resource" value={resource} />
      {row?.id && <input type="hidden" name="id" value={String(row.id)} />}
      <div className="grid gap-5 sm:grid-cols-2">
        {definition.fields.map((field) => (
          <ResourceField
            key={field.name}
            field={field}
            row={row}
            organizationOptions={organizationOptions}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? <LoaderCircle size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
          {pending ? "Saving…" : `Save ${definition.singular}`}
        </button>
        {state.message && (
          <p className={`text-sm ${state.ok ? "text-emerald-700" : "text-red-700"}`} role="status">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function DeleteButton({ resource, id }: { resource: AdminResource; id: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function remove() {
    if (!window.confirm("Delete this record permanently? This cannot be undone.")) return;
    const formData = new FormData();
    formData.set("resource", resource);
    formData.set("id", String(id));
    startTransition(async () => {
      await deleteResourceAction(formData);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? <LoaderCircle size={14} className="animate-spin" /> : <Trash2 size={14} />}
      Delete
    </button>
  );
}

export default function AdminResourceManager({
  resource,
  rows,
  organizationOptions,
}: AdminResourceManagerProps) {
  const definition = resourceDefinitions[resource];
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = rows.filter((row) =>
    `${displayValue(row, definition.titleField)} ${displayValue(row, definition.subtitleField ?? "")}`
      .toLowerCase()
      .includes(normalizedSearch),
  );

  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Content</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
            {definition.label}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">{definition.description}</p>
        </div>
        <span className="self-start rounded-full bg-primary/5 px-4 py-2 text-xs font-semibold text-primary sm:self-auto">
          {rows.length} records
        </span>
      </div>

      <details className="group mt-8 rounded-3xl border border-accent/20 bg-white p-5 shadow-soft sm:p-7">
        <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
            <Plus size={17} />
          </span>
          Add {definition.singular}
          <ChevronDown size={17} className="ml-auto transition-transform group-open:rotate-180" />
        </summary>
        <ResourceForm resource={resource} organizationOptions={organizationOptions} />
      </details>

      <div className="mt-8 rounded-3xl border border-primary/10 bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-4 border-b border-primary/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-primary">Existing {definition.label.toLowerCase()}</h2>
          <label className="block w-full sm:max-w-xs">
            <span className="sr-only">Search {definition.label}</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${definition.label.toLowerCase()}…`}
              className={inputClass}
            />
          </label>
        </div>

        <div className="mt-2 divide-y divide-primary/10">
          {filtered.map((row) => {
            const readOnly = row._readOnly === true;

            return (
              <details key={String(row.id)} className="group py-2">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 rounded-2xl px-3 py-3 hover:bg-neutral-50">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${row.published ? "bg-emerald-500" : "bg-neutral-300"}`} />
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate text-sm font-semibold text-primary">
                      {displayValue(row, definition.titleField)}
                    </strong>
                    {definition.subtitleField && (
                      <span className="mt-1 block truncate text-xs text-neutral-500">
                        {displayValue(row, definition.subtitleField)}
                      </span>
                    )}
                  </span>
                  <span className="hidden text-xs font-medium text-neutral-500 sm:block">
                    {readOnly ? "Source-managed" : row.published ? "Published" : "Draft"}
                  </span>
                  <ChevronDown size={17} className="text-neutral-500 transition-transform group-open:rotate-180" />
                </summary>
                {readOnly ? (
                  <ReadOnlyResourceDetails resource={resource} row={row} />
                ) : (
                  <div className="rounded-2xl bg-neutral-50 p-4 sm:p-6">
                    <div className="flex justify-end">
                      <DeleteButton resource={resource} id={Number(row.id)} />
                    </div>
                    <ResourceForm resource={resource} row={row} organizationOptions={organizationOptions} />
                  </div>
                )}
              </details>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-14 text-center text-sm text-neutral-500">No matching records.</p>
          )}
        </div>
      </div>
    </>
  );
}
