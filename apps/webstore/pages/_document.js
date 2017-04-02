import Document, { Head, Main, NextScript } from 'next/document';
import Header from '@common/header';
import Footer from '@common/footer';
import stylesheet from './_document.scss';

export default class MyDocument extends Document {
  render() {
    return (
     <html>
       <Head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <title>NAP</title>
         <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
       </Head>
       <body>
         { this.props.customValue }
         <Header />
         <Main />
         <Footer />
         <NextScript />
       </body>
     </html>
    );
  }
}
