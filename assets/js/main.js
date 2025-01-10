/*
	Dopetrope by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge:  [ '1281px',  '1680px' ],
		large:   [ '981px',   '1280px' ],
		medium:  [ '737px',   '980px'  ],
		small:   [ null,      '736px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Dropdowns.
	$('#nav > ul').dropotron({
		mode: 'fade',
		noOpenerFade: true,
		alignment: 'center'
	});

	// Nav.

		// Title Bar.
		$(
			'<div id="titleBar">' +
				'<a href="#navPanel" class="toggle"></a>' +
			'</div>'
		)
			.appendTo($body);

		// Panel.
		$(
			'<div id="navPanel">' +
				'<nav>' +
					$('#nav').navList() +
				'</nav>' +
			'</div>'
		)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});

	// Web3 and MetaMask Integration
	$window.on('load', function() {
		// Check if MetaMask is installed
		if (typeof window.ethereum !== 'undefined') {
			const web3 = new Web3(window.ethereum);
			try {
				// Request account access if needed
				window.ethereum.request({ method: 'eth_requestAccounts' })
					.then(() => {
						// Now you can interact with Ethereum, for example:
						web3.eth.getAccounts().then(accounts => {
							console.log("Ethereum Accounts: ", accounts);
						});
					})
					.catch(error => {
						console.error("User denied account access", error);
					});
			} catch (error) {
				console.error("Error initializing Web3: ", error);
			}
		} else {
			console.log("Please install MetaMask!");
		}
	});

})(jQuery);
