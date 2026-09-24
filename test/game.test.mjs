import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {status,score,summary} from '../game.mjs';
const now=1_800_000_000_000;
test('deadline buckets',()=>{assert.equal(status({done:false,due:now-1},now),'overdue');assert.equal(status({done:false,due:now+48*3600000},now),'soon');assert.equal(status({done:false,due:now+49*3600000},now),'later')});
test('on-time completion grants more power',()=>{assert.equal(score({done:true,due:now,completedAt:now}),35);assert.equal(score({done:true,due:now,completedAt:now+1}),15);assert.equal(score({done:false,due:now,completedAt:now}),0)});
test('deadline pressure makes orb volatile',()=>{const items=[{done:false,due:now-1},{done:false,due:now-2},{done:true,due:now,completedAt:now}];assert.deepEqual(summary(items,now),{soon:0,overdue:2,completed:1,xp:35,level:1,progress:35,mood:'volatile'})});
