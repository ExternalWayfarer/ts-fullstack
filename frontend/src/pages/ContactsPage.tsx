
import React from 'react';

function ContactsPage() {
  return (
    <React.Fragment>
  {/* Основной контент страницы */}
      <main className="mt-16 p-4 space-y-8">
        <h1 className="text-4xl font-bold">Welcome to ContactsPage</h1>

        {/* Таблица для тестирования скроллинга */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Phone</th>
                <th className="border border-gray-400 px-4 py-2">City</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2">1</td>
                <td className="border border-gray-400 px-4 py-2">John Doe</td>
                <td className="border border-gray-400 px-4 py-2">johndoe@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(123) 456-7890</td>
                <td className="border border-gray-400 px-4 py-2">New York</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">2</td>
                <td className="border border-gray-400 px-4 py-2">Jane Smith</td>
                <td className="border border-gray-400 px-4 py-2">janesmith@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(987) 654-3210</td>
                <td className="border border-gray-400 px-4 py-2">Los Angeles</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">3</td>
                <td className="border border-gray-400 px-4 py-2">Sam Johnson</td>
                <td className="border border-gray-400 px-4 py-2">samjohnson@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(555) 123-4567</td>
                <td className="border border-gray-400 px-4 py-2">Chicago</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">4</td>
                <td className="border border-gray-400 px-4 py-2">Lisa Brown</td>
                <td className="border border-gray-400 px-4 py-2">lisabrown@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(800) 234-5678</td>
                <td className="border border-gray-400 px-4 py-2">Houston</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">5</td>
                <td className="border border-gray-400 px-4 py-2">Michael Wilson</td>
                <td className="border border-gray-400 px-4 py-2">michaelwilson@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(310) 987-6543</td>
                <td className="border border-gray-400 px-4 py-2">Phoenix</td>
              </tr>
              {/* Дополнительные строки для увеличения длины */}
              <tr>
                <td className="border border-gray-400 px-4 py-2">6</td>
                <td className="border border-gray-400 px-4 py-2">Emma Davis</td>
                <td className="border border-gray-400 px-4 py-2">emmadavis@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(949) 321-7654</td>
                <td className="border border-gray-400 px-4 py-2">San Diego</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">7</td>
                <td className="border border-gray-400 px-4 py-2">David Martinez</td>
                <td className="border border-gray-400 px-4 py-2">davidmartinez@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(916) 555-1234</td>
                <td className="border border-gray-400 px-4 py-2">San Jose</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">8</td>
                <td className="border border-gray-400 px-4 py-2">Sophia Miller</td>
                <td className="border border-gray-400 px-4 py-2">sophiamiller@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(630) 555-6789</td>
                <td className="border border-gray-400 px-4 py-2">Dallas</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">9</td>
                <td className="border border-gray-400 px-4 py-2">James Garcia</td>
                <td className="border border-gray-400 px-4 py-2">jamesgarcia@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(210) 555-9876</td>
                <td className="border border-gray-400 px-4 py-2">San Antonio</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">10</td>
                <td className="border border-gray-400 px-4 py-2">Oliver Thomas</td>
                <td className="border border-gray-400 px-4 py-2">oliverthomas@example.com</td>
                <td className="border border-gray-400 px-4 py-2">(202) 555-3456</td>
                <td className="border border-gray-400 px-4 py-2">Washington</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </React.Fragment>
  );
}

export default ContactsPage;
