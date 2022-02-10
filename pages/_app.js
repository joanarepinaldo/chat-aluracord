
function GlobalStyle(){
    return[
        <style global jsx>{`
        @font-face {
            font-family: Chicago;
            src: url(sysfont.woff2);
          }
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
            font-family: 'Chicago', sans-serif !important;
            }
            body {
                
            }
            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */ 

        `}</style>
    ]

}
export default function CustomApp({ Component, pageProps }){
    return [ 
        <>
        <GlobalStyle />
        <Component {...pageProps} />
        </>
    ];
}