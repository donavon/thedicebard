const measurementId = "G-KDCSM2CWSC";

export function GoogleAnalytics() {
  if (import.meta.env.DEV) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=window.gtag||gtag;
  gtag('js', new Date());
  gtag('config','${measurementId}');

  var load=function(){
    if (document.getElementById('ga-gtag')) return;
    var s=document.createElement('script');
    s.id='ga-gtag';
    s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id=${measurementId}';
    document.head.appendChild(s);
  };
  if ('requestIdleCallback' in window) {
    requestIdleCallback(load,{timeout:2000});
  } else {
    setTimeout(load,1500);
  }
})();`,
      }}
    />
  );
}
