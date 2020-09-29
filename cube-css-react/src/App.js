import React from "react";
import profileImage from "./profile-image.jpg";
import { Button, Flow, Pill, Splitter, VisuallyHidden, Wrapper } from "./ComponentLibrary";
import "./App.scss";

const App = () => (
  <div className="bg-light color-primary font-base">
    <header role="banner" className="site-head bg-tertiary-glare">
      <Wrapper>
        <div className="site-head__inner">
          <h1 className="text-600">Account overview</h1>
          <div className="user">
            <a href="#">My profile</a>
            <img src={profileImage} width="50" height="50" alt="Lorem Ipsum" />
          </div>
        </div>
      </Wrapper>
    </header>
    <main>
      <Wrapper component="article">
        <Splitter className="key-header gap-top-700">
          <h2 className="text-700" id="transaction-label">
            Latest transactions
          </h2>
          <aside>
            <Button component="a" href="#" data-variant="ghost">
              Get statement
            </Button>
            <Button component="a" href="#">
              Make payment
            </Button>
          </aside>
        </Splitter>
        <Splitter className="gap-top-600">
          <Flow component="section" className="table-group radius" aria-labelledby="transaction-label">
            <h3 className="color-secondary-shade text-400 weight-medium">14th July 2020</h3>
            <table>
              <VisuallyHidden component="thead">
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </VisuallyHidden>
              <tbody>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-tertiary color-light">Expenses</Pill>
                  </td>
                  <td>-£123.40</td>
                </tr>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-quaternary color-light">Bills</Pill>
                  </td>
                  <td>-£70.40</td>
                </tr>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-quaternary color-light">Bills</Pill>
                  </td>
                  <td>-£333.33</td>
                </tr>
              </tbody>
            </table>
            <h3 className="color-secondary-shade text-400 weight-medium">13th July 2020</h3>
            <table>
              <VisuallyHidden component="thead">
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </VisuallyHidden>
              <tbody>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-tertiary color-light">Expenses</Pill>
                  </td>
                  <td>-£123.40</td>
                </tr>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-quaternary color-light">Bills</Pill>
                  </td>
                  <td>-£70.40</td>
                </tr>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-quaternary color-light">Bills</Pill>
                  </td>
                  <td>-£333.33</td>
                </tr>
              </tbody>
            </table>
            <h3 className="color-secondary-shade text-400 weight-medium">12th July 2020</h3>
            <table>
              <VisuallyHidden component="thead">
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </VisuallyHidden>
              <tbody>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-tertiary color-light">Expenses</Pill>
                  </td>
                  <td>-£123.40</td>
                </tr>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-quaternary color-light">Bills</Pill>
                  </td>
                  <td>-£70.40</td>
                </tr>
                <tr>
                  <td>Lorem ipsum dolor sit amet</td>
                  <td>
                    <Pill className="bg-quaternary color-light">Bills</Pill>
                  </td>
                  <td>-£333.33</td>
                </tr>
              </tbody>
            </table>
          </Flow>
          <Flow component="section" className="summary radius bg-primary color-light">
            <h3 className="color-tertiary-glare text-700">Summary</h3>
            <Flow component="dl">
              <dt className="text-600 color-tertiary-glare">Balance</dt>
              <dd className="text-700 font-mono weight-bold">£673.43</dd>
              <dt className="text-600 color-tertiary-glare">Total outgoings</dt>
              <dd className="text-700 font-mono weight-bold">-£874.88</dd>
              <dt className="text-600 color-tertiary-glare">Total income</dt>
              <dd className="text-700 font-mono weight-bold">+£1548.31</dd>
            </Flow>
          </Flow>
        </Splitter>
      </Wrapper>
    </main>
  </div>
);

export default App;
