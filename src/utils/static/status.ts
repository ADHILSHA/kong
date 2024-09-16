export type Status = {
  label: string;
  icon: string;
}
export const statuses: Record<string, Status> = {
  in_progress: {
    label: 'In progress',
    icon: '/assets/icons/progress.svg',
  },
  un_published: {
    label: 'Unpublished',
    icon: '/assets/icons/close.svg',
  },
  published: {
    label: 'Published to Portal',
    icon: '/assets/icons/check-mark.svg',
  },
}