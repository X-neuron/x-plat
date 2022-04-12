import ReactDom from 'react-dom';
// import { createRoot } from 'react-dom/client';
import { Suspense } from "react";
// import { start } from "qiankun";
import PageLoading from "@/components/PageLoading";
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { start } from 'qiankun';
import App from './app';
import 'antd/dist/antd.variable.min.css';

// 真实线上环境 请注释掉mock
// import runMock from "@/mock";

// runMock();

const initalContainer = document.getElementById('root');

// const root = createRoot(initalContainer);
// root.render(
//   <RecoilRoot>
//     <BrowserRouter>
//       <Suspense fallback={<PageLoading />} >
//         <App />
//       </Suspense>
//     </BrowserRouter>
//   </RecoilRoot>,
//   initalContainer,
// );

ReactDom.render(
  <RecoilRoot>
    <BrowserRouter>
      <Suspense fallback={<PageLoading />} >
        <App />
      </Suspense>
    </BrowserRouter>
  </RecoilRoot>,
  initalContainer,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

start();
