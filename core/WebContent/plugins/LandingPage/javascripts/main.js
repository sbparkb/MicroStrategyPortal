(function() {
    var isMobile = {
        Android: function() {
            return /Android/i.test(navigator.userAgent);
        },
        BlackBerry: function() {
            return /BlackBerry/i.test(navigator.userAgent);
        },
        iOS: function() {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        androidPhone: function() {
            if (this.Android()) {
                return /Mobile/i.test(navigator.userAgent);
            }
            return false;
        },
        androidTablet: function() {
            if (this.Android()) {
                return !this.androidPhone();
            }
            return false;
        },
        iPhone: function() {
            return /iPhone/i.test(navigator.userAgent);
        },
        iPad: function() {
            return /iPad/i.test(navigator.userAgent);
        },
        Windows: function() {
            return /IEMobile/i.test(navigator.userAgent);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };

    function setLinks(json) {
        var isIos = isMobile.iOS(),
            isAndroid = isMobile.Android(),
            mobDlLinkIos = json.iPadMstrDownload,
            mobDlLinkAndroid = json.androidMstrDownload,
            mobConfigLink = '#',
            proDlLink = '#',
            proConfigLink = '#';

        if (isIos === false && isAndroid === false) {
            //web defaults
            proDlLink = json.iPhoneProDownload;

            document.getElementById('mstr-mobility-cfg').removeAttribute('href');
            document.getElementById('mstr-mobility-cfg-button').disabled = true;
        } else {
			document.getElementById('mstr-mobility-cfg-button').disabled = false;
            if (isMobile.iPad() === true) {
                mobConfigLink = json.iPadMstr;
                proDlLink = json.iPadProDownload;
                proConfigLink = json.iPadPro;
            }
            if (isMobile.iPhone() === true) {
                mobConfigLink = json.iPhoneMstr;
                proDlLink = json.iPhoneProDownload;
                proConfigLink = json.iPhonePro;
                mobDlLinkIos = json.iPhoneMstrDownload;
            }
            if (isMobile.androidTablet() === true) {
                mobConfigLink = json.androidMstrTablet;
            }
            if (isMobile.androidPhone() === true) {
                mobConfigLink = json.androidMstrPhone;
            }

            document.getElementById('mstr-mobility-cfg').setAttribute('href', mobConfigLink);
        }
	
        if (isMobile.Android() === false) {
            $(".mstr-mobile-only-security").css('display', 'block');
        }
        document.getElementById('mstr-mobility-dl-ios').setAttribute('href', mobDlLinkIos);
        document.getElementById('mstr-mobility-dl-android').setAttribute('href', mobDlLinkAndroid);
        document.getElementById('mstr-security-dl').setAttribute('href', proDlLink);
    }

    function addDataSourceList(json) {
        var mobile = isMobile.any();
        if (mobile === true) {
            $(".mstr-dataSources-list").css('display', 'none');
            return;
        }
        var dsList = document.getElementById('dataSources-list');
        var dsContainer = document.createElement('DIV');
        dsContainer.className = 'mstr-ds-holder';
        dsList.appendChild(dsContainer);
        dsList.appendChild(document.createElement('hr'));

        for (var key in json) {
            var dsItemContainerOuter = document.createElement('DIV');
            dsItemContainerOuter.className = "mstr-ds-item-list-container-outer";

            var dsList = json[key];
            var label = document.createElement('LABEL');
            label.className = 'mstr-ds-label';
            label.innerText = key;
            dsItemContainerOuter.appendChild(label);

            var dsItemListContainer = document.createElement('DIV');
            dsItemListContainer.className = "mstr-ds-item-list-container";
            dsItemContainerOuter.appendChild(dsItemListContainer);
            dsContainer.appendChild(dsItemContainerOuter);
            for (var ds in dsList) {
                var dsAnchor = document.createElement('a');
                var dsItemContainer = document.createElement('DIV'),
                    imageDiv = document.createElement('IMG'),
                    labelDiv = document.createElement('DIV');

                dsAnchor.className = "mstr-ds-item-container-link";
                dsItemContainer.className = 'mstr-ds-item-container';
                dsContainer.appendChild(dsItemContainer);
                dsAnchor.setAttribute('href', dsList[ds].link);
                imageDiv.className = 'mstr-ds-image';
                imageDiv.setAttribute('src', dsList[ds].img)
                dsItemContainer.appendChild(imageDiv);
                labelDiv.className = 'mstr-ds-item-label';
                labelDiv.innerText = dsList[ds].name;
                dsItemContainer.appendChild(labelDiv);
                dsItemListContainer.appendChild(dsAnchor);
                dsAnchor.appendChild(dsItemContainer);
            }
        }
    }

    $(document).ready(function() {
        $.getJSON("../plugins/LandingPage/config.json", function(json) {
            //setup the classes for the the buttons/links
            document.getElementById('networkMgr').setAttribute('href', json.networkMgr);
            document.getElementById('usherAnalytics').setAttribute('href', json.usherAnalytics);
            document.getElementById('mstrWeb').setAttribute('href', json.mstrWeb);
            document.getElementById('webAdmin').setAttribute('href', json.webAdmin);
            document.getElementById('mstrDev').setAttribute('href', json.mstrDev);
            document.getElementById('mstrDesktop').setAttribute('href', json.mstrDesktop);
            document.getElementById('mstrMobile').setAttribute('href', json.mstrMobile);
            document.getElementById('usherMobile').setAttribute('href', json.usherMobile);
            document.getElementById('mobileAdmin').setAttribute('href', json.mobileAdmin);
			document.getElementById('mstrTutorial').setAttribute('href', json.mstrTutorial);
			

			
			document.getElementById('mstrVersion').textContent = json.mstrVersion;
			
            document.getElementById('IPAddress').textContent = "Intelligence Server IP Address: " + json.linuxBoxIP;
            document.getElementById('MachineName').textContent = "MicroStrategy Developer & Tools Machine Name: " + json.utilityBox;
            document.getElementById('RDC').className = "rdc " + json.envType;
			
            document.getElementById('installGuide').setAttribute('href', json.installGuide);
            document.getElementById('passwordFile').innerHTML = json.passwordFile;

            setLinks(json);
        });

        $("#signout").on('click', function(e) {
            e.preventDefault();
            $.ajax({
                url: "mstrWeb?evt=3019&amp;src=mstrWeb.3019"
            }).done(function() {
                location.reload();
            });
        });
    });
})();
