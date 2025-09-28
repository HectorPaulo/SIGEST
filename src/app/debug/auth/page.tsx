// "use client";
//
// import { useState, useEffect } from 'react';
// import { isAuthenticated, getCurrentUser } from '@/utils/auth/autenticacion';
// import { useUser } from '@/utils/context/UserContext/UserContext';
//
// interface AuthStatus {
//   token: boolean;
//   refreshToken: boolean;
//   user: boolean;
//   isAuthenticated: boolean;
//   currentUser: any;
//   tokenValue: string | null;
//   userValue: any;
//   contextUser: any;
// }
//
// export default function AuthDebug() {
//   const [authStatus, setAuthStatus] = useState<AuthStatus>({
//     token: false,
//     refreshToken: false,
//     user: false,
//     isAuthenticated: false,
//     currentUser: null,
//     tokenValue: null,
//     userValue: null,
//     contextUser: null
//   });
//
//   const { user: contextUser } = useUser();
//
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('token');
//       const refreshToken = localStorage.getItem('refreshToken');
//       const user = localStorage.getItem('user');
//       const isAuth = isAuthenticated();
//       const currentUser = getCurrentUser();
//
//       console.log('Debug - Raw localStorage values:', {
//         token,
//         refreshToken,
//         user,
//         contextUser
//       });
//
//       setAuthStatus({
//         token: !!token,
//         refreshToken: !!refreshToken,
//         user: !!user,
//         isAuthenticated: isAuth,
//         currentUser,
//         tokenValue: token ? `${token.substring(0, 20)}...` : null,
//         userValue: user ? JSON.parse(user) : null,
//         contextUser
//       });
//     };
//
//     checkAuth();
//
//     // Verificar cada 2 segundos por cambios
//     const interval = setInterval(checkAuth, 2000);
//
//     return () => clearInterval(interval);
//   }, [contextUser]);
//
//   const testLogin = async () => {
//     try {
//       // Función de prueba para simular login
//       const testData = {
//         accessToken: 'test-token-123',
//         refreshToken: 'test-refresh-123',
//         user: {
//           id: '1',
//           username: 'test',
//           name: 'Usuario Test',
//           email: 'test@test.com',
//           apellidoPat: 'Test',
//           apellidoMat: 'User',
//           profileImg: null,
//           funcion: 'admin'
//         }
//       };
//
//       localStorage.setItem('token', testData.accessToken);
//       localStorage.setItem('refreshToken', testData.refreshToken);
//       localStorage.setItem('user', JSON.stringify(testData.user));
//
//       console.log('Test data stored:', testData);
//     } catch (error) {
//       console.error('Error in test login:', error);
//     }
//   };
//
//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Estado de Autenticación - Debug</h1>
//
//       <div className="bg-gray-100 p-4 rounded-lg mb-4">
//         <h2 className="text-lg font-semibold mb-2">LocalStorage & Context</h2>
//         <pre className="text-sm overflow-auto whitespace-pre-wrap">
//           {JSON.stringify(authStatus, null, 2)}
//         </pre>
//       </div>
//
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         <div className={`p-4 rounded-lg ${authStatus.token ? 'bg-green-100' : 'bg-red-100'}`}>
//           <h3 className="font-semibold">Token</h3>
//           <p className="text-sm">{authStatus.token ? '✓ Presente' : '✗ Ausente'}</p>
//           {authStatus.tokenValue && (
//             <p className="text-xs font-mono break-all">{authStatus.tokenValue}</p>
//           )}
//         </div>
//
//         <div className={`p-4 rounded-lg ${authStatus.refreshToken ? 'bg-green-100' : 'bg-red-100'}`}>
//           <h3 className="font-semibold">Refresh Token</h3>
//           <p className="text-sm">{authStatus.refreshToken ? '✓ Presente' : '✗ Ausente'}</p>
//         </div>
//
//         <div className={`p-4 rounded-lg ${authStatus.user ? 'bg-green-100' : 'bg-red-100'}`}>
//           <h3 className="font-semibold">Usuario localStorage</h3>
//           <p className="text-sm">{authStatus.user ? '✓ Presente' : '✗ Ausente'}</p>
//           {authStatus.userValue && (
//             <p className="text-xs">
//               {authStatus.userValue.name} - {authStatus.userValue.email}
//             </p>
//           )}
//         </div>
//       </div>
//
//       <div className={`p-4 rounded-lg mb-4 ${authStatus.contextUser ? 'bg-green-100' : 'bg-yellow-100'}`}>
//         <h3 className="font-semibold">Usuario en Contexto React</h3>
//         <p className="text-sm">
//           {authStatus.contextUser ?
//             `✓ ${authStatus.contextUser.name} (${authStatus.contextUser.email})` :
//             '⚠️ No cargado en contexto'
//           }
//         </p>
//       </div>
//
//       <div className="mt-6 space-x-4">
//         <button
//           onClick={() => window.location.reload()}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Recargar
//         </button>
//
//         <button
//           onClick={testLogin}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Test Login (Datos Falsos)
//         </button>
//
//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.reload();
//           }}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Limpiar LocalStorage
//         </button>
//
//         <button
//           onClick={() => {
//             window.location.href = '/auth/login';
//           }}
//           className="bg-purple-500 text-white px-4 py-2 rounded"
//         >
//           Ir a Login
//         </button>
//       </div>
//     </div>
//   );
// }