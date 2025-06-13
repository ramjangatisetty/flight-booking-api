const AuditLog = require('../models/AuditLog');

const listAuditLogs = async (req, res) => {
  const { user, resource, action } = req.query;
  const query = {};
  if (user) query.user = user;
  if (resource) query.resource = resource;
  if (action) query.action = action;
  const logs = await AuditLog.find(query).sort({ timestamp: -1 }).limit(100);
  res.json(logs);
};

const getAuditLog = async (req, res) => {
  const log = await AuditLog.findById(req.params.id);
  if (!log) return res.status(404).json({ error: 'Log not found' });
  res.json(log);
};

module.exports = { listAuditLogs, getAuditLog };
