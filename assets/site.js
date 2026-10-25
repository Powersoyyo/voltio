/* Configuración de AdSense */
var ADS = {
  client: "ca-pub-8386275154214431",
  slots: { top: "0000000000", feed: "0000000000", side: "0000000000" }
};
function getConsent(){ try { return localStorage.getItem("cookies"); } catch(e){ return null; } }
function setConsent(v){ try { localStorage.setItem("cookies", v); } catch(e){} }
function loadAds(){
  if (!/^ca-pub-\d+$/.test(ADS.client)) return;
  var s = document.createElement("script");
  s.async = true; s.crossOrigin = "anonymous";
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + ADS.client;
  document.head.appendChild(s);
  document.querySelectorAll(".ad").forEach(function(el){
    if (ADS.slots[el.dataset.ad] === "0000000000") return;   // bloque aún sin crear en AdSense
    var box = el.querySelector(".ad-box"), ins = document.createElement("ins");
    ins.className = "adsbygoogle"; ins.style.display = "block";
    ins.setAttribute("data-ad-client", ADS.client);
    ins.setAttribute("data-ad-slot", ADS.slots[el.dataset.ad]);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    box.textContent = ""; box.classList.add("live"); box.appendChild(ins);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
}
var banner = document.getElementById("cookies");
function decide(v){ setConsent(v); banner.hidden = true; if (v === "yes") loadAds(); }
document.getElementById("c-ok").onclick = function(){ decide("yes"); };
document.getElementById("c-no").onclick = function(){ decide("no"); };
document.getElementById("cookie-settings").onclick = function(e){ e.preventDefault(); banner.hidden = false; };
var c = getConsent();
if (c === "yes") loadAds(); else if (c !== "no") banner.hidden = false;
