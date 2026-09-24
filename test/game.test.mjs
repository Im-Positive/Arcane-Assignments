import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {status,score,summary,duePreset} from '../game.mjs';
const now=1_800_000_000_000;
test('deadline buckets',()=>{assert.equal(status({done:false,due:now-1},now),'overdue');assert.equal(status({done:false,due:now+48*3600000},now),'soon');assert.equal(status({done:false,due:now+49*3600000},now),'later')});
test('completion rewards and pressure',()=>{assert.equal(score({done:true,due:now,completedAt:now}),35);assert.equal(score({done:true,due:now,completedAt:now+1}),15);const tasks=[{done:false,due:now-1},{done:false,due:now-2},{done:true,due:now,completedAt:now}];assert.deepEqual(summary(tasks,now),{open:2,soon:0,overdue:2,completed:1,xp:35,level:1,progress:35,mood:'volatile'})});
test('date presets use local calendar days',()=>{const date=new Date(2026,8,24,10,30);const tomorrow=duePreset('tomorrow',date);assert.equal(tomorrow.getDate(),25);assert.equal(tomorrow.getHours(),17);assert.equal(duePreset('today',date).getHours(),23);assert.equal(duePreset('week',date).getDate(),1);assert.equal(duePreset('weekend',date).getDay(),6)});
