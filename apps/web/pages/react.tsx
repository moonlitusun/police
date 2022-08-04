import { Button } from "ui";
import { a } from '@dz-web-police/react';

export default function ReactPage() {

  console.log(a(), '<-- a()');
  return (
    <div>
      <h1>Web</h1>

      <Button />
    </div>
  );
}
