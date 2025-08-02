import Link from "next/link";
import { Button, Card, Result } from "antd";

export default function Page403() {
  return (
    <Card variant="borderless">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link href="/">
            <Button type="primary">Back to home</Button>
          </Link>
        }
      />
    </Card>
  );
}
