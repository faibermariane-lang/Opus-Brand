import { useId, useState } from 'react';
import { getPurchaseTarget, track } from '../../lib/analytics';
import { Button, type ButtonProps } from './Button';

/**
 * Botão de compra preparado para checkout.
 * - checkoutUrl configurado  → abre o checkout (evento checkout_start)
 * - só WhatsApp configurado  → abre conversa (evento whatsapp_click)
 * - nada configurado          → informa que as vendas abrirão em breve (sem inventar dados)
 */
export function PurchaseButton({ children, location, ...rest }: Omit<ButtonProps, 'href'> & { location: string }) {
  const target = getPurchaseTarget();
  const [notice, setNotice] = useState(false);
  const noticeId = useId();

  return (
    <div className="flex flex-col items-stretch gap-3 sm:items-start">
      <Button
        {...rest}
        href={target.href}
        {...(target.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-describedby={notice ? noticeId : undefined}
        onClick={(e) => {
          track('cta_purchase_click', { location, destination: target.kind });
          if (target.kind === 'checkout') track('checkout_start', { location });
          if (target.kind === 'whatsapp') track('whatsapp_click', { location });
          if (target.kind === 'pending') {
            e.preventDefault();
            setNotice(true);
          }
        }}
      >
        {children}
      </Button>
      <p id={noticeId} role="status" aria-live="polite" className="text-sm font-semibold text-ink/70">
        {notice &&
          'As vendas serão abertas em breve. As condições de compra e entrega serão publicadas aqui assim que forem definidas.'}
      </p>
    </div>
  );
}
