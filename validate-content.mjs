/** Offline, dependency-free content schema validator. Run at repository root. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'data/topics.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(source, context, { filename: 'data/topics.js', timeout: 1000 });
const topics = context.window.AI_ATLAS_TOPICS;
const categories = context.window.AI_ATLAS_CATEGORIES;
const errors = [];
const okString = (x) => typeof x === 'string' && x.trim().length > 0;
const fail = (i, label) => errors.push(`Topic #${i + 1}: ${label}`);
if (!Array.isArray(topics) || topics.length === 0) errors.push('topics must be a non-empty array');
if (!Array.isArray(categories)) errors.push('categories must be an array');
const allowedCategories = new Set(['foundation', 'application', 'practice']);
const seen = new Set();
if (Array.isArray(topics)) topics.forEach((topic, i) => {
  if (!topic || typeof topic !== 'object') { fail(i, 'must be an object'); return; }
  if (!okString(topic.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.id)) fail(i, 'id must be lowercase kebab-case');
  if (seen.has(topic.id)) fail(i, `duplicate id '${topic.id}'`);
  seen.add(topic.id);
  for (const key of ['title','english','summary','oneLiner','symbol']) if (!okString(topic[key])) fail(i, `${key} must be a non-empty string`);
  if (!allowedCategories.has(topic.category)) fail(i, 'category must be foundation/application/practice');
  if (!['入門','進階入門'].includes(topic.level)) fail(i, 'invalid level');
  if (!Number.isInteger(topic.minutes) || topic.minutes < 1 || topic.minutes > 30) fail(i, 'minutes must be an integer from 1 to 30');
  if (!Array.isArray(topic.tags) || topic.tags.length < 2 || topic.tags.length > 4 || !topic.tags.every(okString) || new Set(topic.tags).size !== topic.tags.length) fail(i, 'tags must be 2–4 unique non-empty strings');
  if (!Array.isArray(topic.sections) || topic.sections.length < 3) fail(i, 'sections must contain at least 3 sections');
  else topic.sections.forEach((s, j) => {
    if (!okString(s.heading) || !Array.isArray(s.paragraphs) || s.paragraphs.length < 1 || !s.paragraphs.every(okString)) fail(i, `section ${j+1} needs heading and non-empty paragraphs`);
    if (s.bullets && (!Array.isArray(s.bullets) || !s.bullets.length || !s.bullets.every(okString))) fail(i, `section ${j+1} has invalid bullets`);
  });
  if (!Array.isArray(topic.keyPoints) || topic.keyPoints.length !== 3 || !topic.keyPoints.every(okString)) fail(i, 'keyPoints must contain exactly 3 strings');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(topic.updated) || Number.isNaN(Date.parse(topic.updated))) fail(i, 'updated must be a valid YYYY-MM-DD date');
});
if (Array.isArray(categories)) {
  const ids = categories.map((cat) => cat.id);
  if (new Set(ids).size !== ids.length) errors.push('duplicate category ids');
  if (!ids.includes('all') || ![...allowedCategories].every((id) => ids.includes(id))) errors.push('missing required categories');
}
if (errors.length) {
  console.error(`FAIL: ${errors.length} problem(s) found\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`PASS: ${topics.length} topics, ${categories.length} filter options, all required fields valid.`);
}
