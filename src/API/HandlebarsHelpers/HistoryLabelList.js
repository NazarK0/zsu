"use strict";function t(t){const e=t.map(t=>"<option value='".concat(t,"'>").concat(t,"</option>"));return e.unshift('<option value="" id="history-list-unselected">Не вибрано</option>'),"<select id='historyLinkLabel-dropdown' class=\"stretch\" name='historyLinkLabel' style=\"text-align: center; width;100%;\" size=1>".concat(e.join("\n"),"</select>")}const e=e=>e.length>0?t(e):"";module.exports=e;