'use client'

import { useIntl } from '@/intl/use-intl';
import { useTransition } from 'react';
import { setLanguage } from '@/app/actions/set-language';

export default function Section() {
  const { fta, locale } = useIntl();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    startTransition(() => {
      setLanguage(newLocale).then(() => {
        window.location.reload();
      });
    });
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <select
          value={locale}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
        </select>
      </div>
      <h1 className="text-2xl font-bold">
        {fta({ id: "greeting2" })}
      </h1>
      <p className="text-lg">
        {fta({ id: "welcome2"})}
      </p>
    </div>
  );
}
