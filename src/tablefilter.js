(function(){
function doFilter(tr, filter) {
  tr.style.display = Array.from(tr.cells).reduce((show, td, i) => show && (!filter[i] || td.textContent.toLowerCase().indexOf(filter[i]) >= 0), true) ?  '' : 'none';
}
function addFilter(table) {
  const rows = Array.from(table.querySelectorAll(':scope > thead > tr, :scope > tr, :scope > tbody > tr'));
  const colCount = rows.reduce((n, r) => Math.max(n, r.cells?.length), 0);
  if (rows.length < 2 || !colCount) return;
  const thead = document.createElement('thead');
  thead.style = 'background-color:#eaeaea';
  thead.innerHTML = '<tr>' + '<td style="padding:3px;"><input style="width:100%;box-sizing:border-box;padding:5px;border:1px inset #f4f4f4;"></td>'.repeat(colCount) + '</tr>';
  const input = thead.querySelectorAll('input');
  input.forEach(e => e.addEventListener('keyup', e2 => e2.keyCode === 13 ? rows.forEach((tr, i) => i > 0 ? doFilter(tr, Array.from(input).map(a => a.value?.toLowerCase())) : null) : null));
  input.forEach(e => e.addEventListener('focus', e2 => e2.target.focus()));
  table.insertBefore(thead, table.childNodes[0]);
}
document.querySelectorAll('table').forEach(e => addFilter(e));
})()

