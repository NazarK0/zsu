"use strict";const n=n=>n.length>0?t(n):"<p>Список порожній</p>";function t(n){const t=n.map(n=>{n.page_title.length>35?n.page_title:n.page_title.substring(0,35);return"<option value='".concat(n.id,"'>").concat(n.page_title,"</option>")});return t.unshift("<option value='historyWar'>Історія війни</option>"),t.unshift("<option value='files'>Нормативно-правова база</option>"),t.unshift("<option value='contact'>Контакти</option>"),t.unshift("<option value='commander'>Командування</option>"),t.unshift("<option value='unlink'>Відкріпити контент</option>"),t.unshift("<option value='".concat(null,"'>Виберіть з списку</option>")),"<style>\n      .content-list {\n        display: flex;\n        height: 64px;\n      }\n      .content-list select {\n        text-align: center;\n        margin-right: 0;\n        margin-left: 0;\n        border-radius: 4px 0 0 4px;\n        flex: 1;\n      }\n\n      .content-list .filter-block {\n        display: flex;\n        height: 64px;\n      }\n\n      .content-list .filter-block input {\n        margin-right: 0;\n        margin-left: 0;\n        border-radius: 0;\n      }\n\n      .content-list .filter-block input:focus,\n      .content-list select:focus {\n        outline: 0;\n      }\n\n      .content-list .filter-block img {\n        padding: 5px;\n        margin: 10px 0;\n        background-color: #fff;\n        width: 30px;\n        border-radius: 0 4px 4px 0;\n      }\n\n      @media screen and (max-width: 1300px) {\n       .content-list {\n         flex-wrap: wrap;\n         justify-content: center;\n         margin-bottom: 60px;\n       }\n       .content-list select {\n          border-radius: 4px;\n        }\n        .content-list .filter-block input {\n          margin-right: 0;\n          margin-left: 0;\n          border-radius: 4px 0 0 4px;\n        }\n      }\n     </style>\n     <div class=\"stretch content-list\">\n       <select id='content-dropdown' name='content_id' size=1>".concat(t,'</select>\n       <div class="filter-block">\n         <input type="search" id="content-filter" placeholder="Фільтр"/>\n         <img src="/images/filter.svg"/>\n       </div>\n     </div>')}module.exports=n;