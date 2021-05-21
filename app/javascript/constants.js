const status = {
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  COMPLETE: 'complete',
};

const statusLabel = {
  [status.PENDING_APPROVAL]: 'Pending Approval',
  [status.APPROVED]: 'Approved',
  [status.COMPLETE]: 'Complete',
};

const statusColor = {
  [status.PENDING_APPROVAL]: 'orange',
  [status.APPROVED]: 'green',
  [status.COMPLETE]: 'red',
};

export {
  status,
  statusLabel,
  statusColor,
};
