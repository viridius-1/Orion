const status = {
  UNDER_REVIEW: 'under_review',
  STAGING: 'staging',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETE: 'complete'
};

const statusLabel = {
  [status.UNDER_REVIEW]: 'Under Review',
  [status.STAGING]: 'Staging',
  [status.ACTIVE]: 'Active',
  [status.PAUSED]: 'Paused',
  [status.COMPLETE]: 'Complete'
};

const statusColor = {
  [status.UNDER_REVIEW]: 'orange',
  [status.STAGING]: 'orange',
  [status.ACTIVE]: 'green',
  [status.PAUSED]: 'red',
  [status.COMPLETE]: 'green'
};

export {
  status,
  statusColor,
  statusLabel,
};
