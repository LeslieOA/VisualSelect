var VisualSelect = function(selectId) {

	function(elem, children) {
		return document.querySelector(elem).querySelectorAll(':scope ' + children)
	};

	var body = document.body,
		select = document.querySelector(selectId),
		options = queryChildren(selectId, 'option'),
		uuid = 'vs-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(
			/[xy]/g,
			function(c) {
				var r = Math.random() * 16|0, v = c == 'x'? r : r&0x3|0x8;
				return v.toString(16);
			}
		),
		vs_select_html = '<div class="visual-select" data-vs-uuid="' + uuid + '">';

	select.setAttribute('data-vs-uuid', uuid);

	for (var i = 0; i < options.length; i++) {
		var html = options[i].innerHTML,
			text = options[i].innerText,
			attr = options[i].attributes,
			val = options[i].getAttribute('value') === null ? '' : options[i].getAttribute('value');
		if (i === 0) {
			vs_select_html += '<div class="vs-default-option" data-value="' + val + '">' + html + '</div>' +
								'<ul class="">' +
									'<li class="vs-option" data-value="' + val + '">' + html + '</li>';
		}
		else {
			vs_select_html += '<li class="vs-option" data-value="' + val + '">' + html + '</li>';
		}
	};
	vs_select_html += '</ul></div>';
	select.insertAdjacentHTML('afterend', vs_select_html);

	// Event listeners
	var vs_container = document.querySelector('[data-vs-uuid]'),
		vs_options = document.querySelectorAll('[data-vs-uuid] li');

	for (var i = 0; i < vs_options.length; i++) {
		var vs_option = vs_options.item(i);
		vs_option.addEventListener('click', function(ev) {
			var target = ev.target,
				uuid = target.parentNode.parentNode.getAttribute('data-vs-uuid');
			document.querySelector('select[data-vs-uuid="' + uuid + '"]').value = target.getAttribute('data-value');

			document.querySelector('.visual-select[data-vs-uuid="' + uuid +'"] .vs-default-option').innerHTML = target.innerText;

			target.parentNode.parentNode.classList.remove('open');
		});
	};

	document.querySelector('.visual-select[data-vs-uuid="' + uuid + '"] .vs-default-option').addEventListener('click', function(ev) {
		ev.preventDefault();
		ev.stopPropagation();

		document.querySelectorAll('.visual-select').forEach(function(vs) { vs.classList.remove('open'); });

		var target = ev.target;
		target.parentNode.classList.add('open');

		var close = document.addEventListener('click', function(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			var closeTarget = ev.target;

			if (!closeTarget.classList.contains('vs-option', 'vs-default-option')) {
				document.querySelectorAll('.visual-select').forEach(function(vs) {
					vs.classList.remove('open');
				});
			}
		});

	});

};

