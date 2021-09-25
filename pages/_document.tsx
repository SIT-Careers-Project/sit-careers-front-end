import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import flush from 'styled-jsx/server'
import { resetServerContext } from 'react-beautiful-dnd'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="SIT Career Center หรือ ระบบบริหารความร่วมมือระหว่างคณะเทคโนโลยีสารสนเทศและอุตสาหกรรม : เว็บไซต์ที่รวบรวมประมาศรับสมัครของบริษัทหางาน และสามารถใหันักศึกษาคณะเทคโนโลยีสาสารสนเทศสมัครงานที่สนใจ"
          />
          <meta
            name="keywords"
            content="sitcc,sitcareer,sitcareercenter,D-Day,หางาน,สมัครงาน,ประกาศรับสมัครงาน,คณะเทคโนโลยีสารสนเทศ,ระบบบริหารความร่วมมือระหว่างคณะเทคโนโลยีสารสนเทศและอุตสาหกรรม"
          />
          <meta
            property="og:title"
            content="SIT Career Center : ระบบบริหารความร่วมมือระหว่างคณะเทคโนโลยีสารสนเทศและอุตสาหกรรม"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://careers.sit.kmutt.ac.th/" />
          <meta
            property="og:image"
            content="https://seniorproject.sit.kmutt.ac.th/projectPoster/posterIT60-BU87.png"
          />
          <meta
            property="og:site_name"
            content="SIT Career Center: ระบบบริหารความร่วมมือระหว่างคณะเทคโนโลยีสารสนเทศและอุตสาหกรรม"
          />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
          <meta name="theme-color" content="#295B8D" />
          <meta name="msapplication-TileColor" content="#295B8D" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => {
        resetServerContext()
        return sheets.collect(<App {...props} />)
      }
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    )
  }
}

export default MyDocument
