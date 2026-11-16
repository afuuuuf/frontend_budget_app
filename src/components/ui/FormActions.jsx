// The Cancel / Submit row at the bottom of a form.
export function FormActions({ submitLabel, loading = false, onCancel }) {
  return (
    <div className="mt-8 flex justify-end gap-3 border-t border-mist pt-6">
      <button
        type="button"
        onClick={onCancel}
        className="h-12 rounded-xl border border-mist bg-surface px-6 text-sm font-medium text-primary hover:bg-ivory"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={loading}
        className="flex h-12 min-w-[9rem] items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
        )}
        {submitLabel}
      </button>
    </div>
  );
}
