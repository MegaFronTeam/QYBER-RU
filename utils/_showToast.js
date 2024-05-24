export const showToast = (severity, summary, detail) => {
  toast.add({
    severity,
    summary,
    detail,
    life: 10000,
  });
};
