import Link from "next/link";
import { Button, Card, Result } from "antd";

export default function Page404() {
  return (
    <Card variant="borderless">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </Card>
  );
}
