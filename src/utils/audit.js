const AuditLog = require('../models/AuditLog');
const logAudit = async ({ user, resource, action, resourceId, before, after }) => {
  await AuditLog.create({
    user, resource, action, resourceId, before, after
  });
};
module.exports = { logAudit };
