
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
            ::-webkit-scrollbar {
                width: 10px;              /* width of the entire scrollbar */
                
              }
              
              ::-webkit-scrollbar-track {
                background:#3C3A4C;
                border-radius: 3px;         /* color of the tracking area */
              }
              
              ::-webkit-scrollbar-thumb {
                background-color: #6d7174c4;    /* color of the scroll thumb */
                border-radius: 3px;       /* roundness of the scroll thumb */
                border: 2px solid "#6d7174c4";  /* creates padding around scroll thumb */
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
