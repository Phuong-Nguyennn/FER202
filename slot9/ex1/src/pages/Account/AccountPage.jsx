import React, { useState } from "react";
import { Container, Card, ProgressBar, Button, Tabs, Tab } from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AccountPage() {
  const [step, setStep] = useState(1);

  const progress = step === 1 ? 33 : step === 2 ? 67 : 100;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h3 className="mb-3"><i className="bi bi-person-circle"></i> Build Your Profile</h3>
        <ProgressBar now={progress} label={`${progress}%`} className="mb-4" />

        <Tabs activeKey={step} onSelect={(k) => setStep(Number(k))}>
          <Tab eventKey={1} title="About"><AboutForm /></Tab>
          <Tab eventKey={2} title="Account"><AccountForm /></Tab>
          <Tab eventKey={3} title="Address"><AddressForm /></Tab>
        </Tabs>

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="secondary"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
          >
            Previous
          </Button>

          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button variant="success">Finish</Button>
          )}
        </div>
      </Card>
    </Container>
  );
}
