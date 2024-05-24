// import { useToast } from 'primevue/usetoast';

export const showToast = (severity, summary, detail) => {
  const toast = useToast();
  toast.add({
    severity,
    summary,
    detail,
    life: 10000,
  });
};
