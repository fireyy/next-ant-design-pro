import Link from "next/link";
import { Button, Card, Result } from "antd";

export default function Page500() {
  return (
    <Card variant="borderless">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link href="/" passHref>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </Card>
  );
}
