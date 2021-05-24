const status = {
  APPROVED: 'approved',
  COMPLETE: 'complete',
  PENDING_APPROVAL: 'pending_approval',
};

const statusLabel = {
  [status.APPROVED]: 'Approved',
  [status.COMPLETE]: 'Complete',
  [status.PENDING_APPROVAL]: 'Pending Approval',
};

const statusColor = {
  [status.APPROVED]: 'green',
  [status.COMPLETE]: 'red',
  [status.PENDING_APPROVAL]: 'orange',
};

export {
  status,
  statusColor,
  statusLabel,
};
