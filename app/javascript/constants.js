const status = {
  "PENDING_APPROVAL": "pending_approval",
  "APPROVED": "approved",
  "COMPLETE": "complete",
}

const statusColor = {
  [status.PENDING_APPROVAL]: "orange",
  [status.APPROVED]: "green",
  [status.COMPLETE]: "red",
}

export {
  status,
  statusColor
}