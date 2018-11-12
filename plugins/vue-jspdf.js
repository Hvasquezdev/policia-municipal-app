import Vue from 'vue';
import JsPdf from 'jspdf';

Vue.prototype.$myInjectedFunction = () => {
  let pdfName = 'test'; 
  var doc = new JsPdf();
  doc.text("Hello World", 10, 10);
  doc.save(pdfName + '.pdf');
}