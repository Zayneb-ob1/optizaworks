export function HeroBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 69% 42%, rgba(106,13,173,0.24), transparent 31%), radial-gradient(circle at 78% 30%, rgba(90,52,190,0.18), transparent 25%), radial-gradient(circle at 14% 78%, rgba(50,16,68,0.16), transparent 27%), linear-gradient(122deg,#03040b 0%,#070817 52%,#090511 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.2) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(circle at 66% 55%, black, transparent 76%)",
        }}
      />
    </>
  );
}
