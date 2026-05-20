import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    console.log('✅ Angular application bootstrapped successfully');
  })
  .catch((err) => {
    console.error('❌ Angular bootstrap failed:', err);
    // Show the error on screen for debugging
    const root = document.querySelector('app-root');
    if (root) {
      root.innerHTML = `
        <div style="padding: 40px; font-family: monospace; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; margin: 20px;">
          <h2>❌ Angular Bootstrap Error</h2>
          <pre style="white-space: pre-wrap; margin-top: 12px;">${err?.message || err}</pre>
          <pre style="white-space: pre-wrap; margin-top: 8px; font-size: 0.8em; color: #666;">${err?.stack || ''}</pre>
        </div>
      `;
    }
  });
