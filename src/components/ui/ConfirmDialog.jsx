import { useEffect, useRef } from "react";

// A confirmation popup built on the native <dialog> element: it traps focus, closes on
// Escape and dims the page by itself. The parent owns `open`; we only mirror it.
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  loading = false,
  onConfirm,
  onCancel,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  const cancel = () => {
    if (!loading) onCancel();
  };

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault(); // let the parent decide, so `open` stays the single source of truth
        cancel();
      }}
      // The dialog has no padding, so a click on its own box can only be a click on the backdrop.
      onClick={(event) => event.target === event.currentTarget && cancel()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-mist bg-surface p-0 text-ink shadow-xl backdrop:bg-ink/40"
    >
      <div className="p-6">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="mt-2 text-[15px] text-slate">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={cancel}
            className="h-12 rounded-xl border border-mist bg-surface px-6 text-sm font-medium text-primary hover:bg-ivory"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex h-12 min-w-[7rem] items-center justify-center gap-2 rounded-xl bg-terracotta px-6 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
