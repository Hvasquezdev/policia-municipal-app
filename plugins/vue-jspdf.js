import Vue from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Vue.prototype.$myInjectedFunction = (facturas) => {
  let doc = new jsPDF('p', 'pt');
  let columns = [
		{title: "ID", dataKey: "id"},
		{title: "Multa", dataKey: "multa"},
    {title: "Usuario", dataKey: "usuario"},
    {title: "Fecha", dataKey: "fecha"},
    {title: "Precio", dataKey: "precio"},
    {title: "Estado", dataKey: "estado"}
	];
  let rows = [];
  
  facturas.forEach((element, index) => {
    rows.push(
      {
        'id': index+1,
        'multa': element.multa.Nombre,
        'usuario': element.user.nombre,
        'fecha': element.factura.Fecha_Emision.split('T')[0].split('-').reverse().join('-'),
        'precio': element.multa.Precio + ' Bs.S',
        'estado': element.factura.Estado_Factura
      }
    );
  });
	doc.autoTable(columns, rows);
	doc.save('teste.pdf');
}