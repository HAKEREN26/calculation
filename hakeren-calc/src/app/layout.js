export const metadata = {
  title: 'Hakeren — Worker Rights Calculation',
  description: 'Social Benefits Calculation for Foreign Workers in Israel',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" defer/>
        <script dangerouslySetInnerHTML={{__html:`
          function googleTranslateElementInit(){
            new google.translate.TranslateElement({
              pageLanguage:'en',
              includedLanguages:'tl,ro,uk,ru,zh-CN,si,hi,ar,fil,th',
              layout:google.translate.TranslateElement.InlineLayout.SIMPLE
            },'google_translate_element');
          }
        `}}/>
      </head>
      <body>{children}</body>
    </html>
  )
}
