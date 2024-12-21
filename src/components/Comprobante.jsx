import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Asegúrate de importar el hook useCart
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Comprobante = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Para redirigir al usuario
    const { clearCart } = useCart();  // Método para vaciar el carrito global
    const {
        cart = [],
        totalAmount = 0,
        comprobante,
        dniOrRuc,
    } = location.state || {};

    const generatePDF = () => {
        const doc = new jsPDF();

        // Título del documento
        doc.setFontSize(18);
        doc.text('Comprobante de Pago', 20, 20);

        // Información del cliente
        doc.setFontSize(12);
        doc.text(`Tipo de Comprobante: ${comprobante === 'boleta' ? 'Boleta' : 'Factura'}`, 20, 40);
        doc.text(`Número de Documento: ${dniOrRuc}`, 20, 50);
        

        // Tabla de productos
        const tableColumn = ['Producto', 'Cantidad', 'Precio Unitario (S/)', 'Subtotal (S/)'];
        const tableRows = cart.map(item => [
            item.nombreProducto,
            item.cantidad,
            item.precio.toFixed(2),
            (item.cantidad * item.precio).toFixed(2),
        ]);

        doc.autoTable({
            startY: 70,
            head: [tableColumn],
            body: tableRows,
        });

        // Total
        doc.text(`Total: S/ ${totalAmount.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 20);

        // Guardar el PDF
        doc.save(`comprobante-${comprobante}-${dniOrRuc}.pdf`);
    };

    const handleBackToHome = () => {
        // Vaciar el carrito global y en localStorage
        clearCart();  // Vaciar carrito global
        localStorage.removeItem('cart');  // Vaciar carrito en localStorage
        
        // Redirigir al inicio
        navigate('/');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img 
                        src="../../backend/images/izitech.png" 
                        alt="Izitech Logo" 
                        style={{ height: '50px', marginBottom: '10px' }}
                    />
            </div>
            <h2>Compra Exitosa</h2>
            <span>La {comprobante === 'boleta' ? 'boleta' : 'factura'} será enviada al correo registrado.</span>
            <br />
            <span>La compra será entregada en 3 días hábiles.</span>

            <div style={{ marginTop: '20px' }}>
                <h3>Detalles de la Compra</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Producto</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Cantidad</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Precio Unitario (S/)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Subtotal (S/)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.nombreProducto}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.cantidad}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.precio.toFixed(2)}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{(item.cantidad * item.precio).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3 style={{ textAlign: 'right', marginTop: '10px' }}>Total: S/ {totalAmount.toFixed(2)}</h3>
            </div>

            <button 
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                onClick={generatePDF}
            >
                Descargar Comprobante en PDF
            </button>

            <button 
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                onClick={handleBackToHome}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default Comprobante;
