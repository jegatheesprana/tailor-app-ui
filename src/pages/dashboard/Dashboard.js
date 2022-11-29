import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography as TypographyWrapper } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];
const menus = [
  { name: 'Measurement', description: 'Measurement is the quantification of attributes of an object or event, which can be used to compare with other objects or events.', to: '/app/measurements', img: '/static/menus/measurements.jpg' },
  { name: 'Customer', description: 'Recipient of a good, service, product or an idea - obtained from a seller, vendor', to: '/app/customers', img: '/static/menus/customers.png' },
  { name: 'Work Order', description: 'A task or a job for a customer, that can be scheduled or assigned to someone.', to: '/app/workOrders', img: '/static/menus/workOrders.png' },
  { name: 'CoatRenting', description: 'Renting, also known as hiring or letting, is an agreement', to: '/app/coatRentings', img: '/static/menus/coatRentings.jpg' },
  { name: 'Products', description: 'In marketing, a product is an object, or system, or service made available for consumer use as of the consumer demand', to: '/app/products', img: '/static/menus/products.jpg' },
  { name: 'Materials', description: 'Material is a substance or mixture of substances that constitutes an object. Materials can be pure or impure, living or non-living matter.', to: '/app/materials', img: '/static/menus/materials.png' },
  { name: 'Tailors', description: 'A tailor is a person who makes or alters clothing, particularly in men\'s clothing.', to: '/app/tailors', img: '/static/menus/tailors.png' },
  { name: 'Payments', description: 'A payment is the voluntary tender of money or its equivalent or of things of value by one party to another in exchange for goods, or services', to: '/app/payments', img: '/static/menus/payments.png' },
]

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  return <Grid container spacing={4} mt={2}>
    {menus.map((menu, id) => (
      <Grid item xs={4} lg={3} md={4} key={id}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={menu.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {menu.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {menu.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={menu.to}>Go</Button>
            <Button size="small" component={Link} to={menu.to}>Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>

  return <>
    <PageTitle title="Dashboard" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
    >
      Latest Reports
    </Button>} />
    <Grid container spacing={4}>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Widget
          title="Visits Today"
          upperTitle
          bodyClass={classes.fullHeightBody}
          className={classes.card}
        >
          <div className={classes.visitsNumberContainer}>
            <Grid container item alignItems={"center"}>
              <Grid item xs={6}>
                <TypographyWrapper size="xl" weight="medium" noWrap>
                  12, 678
                </TypographyWrapper>
              </Grid>
              <Grid item xs={6}>
                <LineChart
                  width={100}
                  height={30}
                  data={[
                    { value: 10 },
                    { value: 15 },
                    { value: 10 },
                    { value: 17 },
                    { value: 18 },
                  ]}
                >
                  <Line
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.success.main}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </Grid>
            </Grid>
          </div>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={4}>
              <TypographyWrapper color="text" colorBrightness="secondary" noWrap>
                Registrations
              </TypographyWrapper>
              <TypographyWrapper size="md">860</TypographyWrapper>
            </Grid>
            <Grid item xs={4}>
              <TypographyWrapper color="text" colorBrightness="secondary" noWrap>
                Sign Out
              </TypographyWrapper>
              <TypographyWrapper size="md">32</TypographyWrapper>
            </Grid>
            <Grid item xs={4}>
              <TypographyWrapper color="text" colorBrightness="secondary" noWrap>
                Rate
              </TypographyWrapper>
              <TypographyWrapper size="md">3.25%</TypographyWrapper>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Grid item lg={3} md={8} sm={6} xs={12}>
        <Widget
          title="App Performance"
          upperTitle
          className={classes.card}
          bodyClass={classes.fullHeightBody}
        >
          <div className={classes.performanceLegendWrapper}>
            <div className={classes.legendElement}>
              <Dot color="warning" />
              <TypographyWrapper
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
              >
                Integration
              </TypographyWrapper>
            </div>
            <div className={classes.legendElement}>
              <Dot color="primary" />
              <TypographyWrapper
                color="text"
                colorBrightness="secondary"
                className={classes.legendElementText}
              >
                SDK
              </TypographyWrapper>
            </div>
          </div>
          <div className={classes.progressSection}>
            <TypographyWrapper
              size="md"
              color="text"
              colorBrightness="secondary"
              className={classes.progressSectionTitle}
            >
              Integration
            </TypographyWrapper>
            <LinearProgress
              variant="determinate"
              value={77}
              classes={{ barColorPrimary: classes.progressBarPrimary }}
              className={classes.progress}
            />
          </div>
          <div>
            <TypographyWrapper
              size="md"
              color="text"
              colorBrightness="secondary"
              className={classes.progressSectionTitle}
            >
              SDK
            </TypographyWrapper>
            <LinearProgress
              variant="determinate"
              value={73}
              classes={{ barColorPrimary: classes.progressBarWarning }}
              className={classes.progress}
            />
          </div>
        </Widget>
      </Grid>
      <Grid item lg={3} md={8} sm={6} xs={12}>
        <Widget
          title="Server Overview"
          upperTitle
          className={classes.card}
          bodyClass={classes.fullHeightBody}
        >
          <div className={classes.serverOverviewElement}>
            <TypographyWrapper
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
              noWrap
            >
              60% / 37°С / 3.3 Ghz
            </TypographyWrapper>
            <div className={classes.serverOverviewElementChartWrapper}>
              <ResponsiveContainer height={50} width="99%">
                <AreaChart data={getRandomData(10)}>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.secondary.main}
                    fill={theme.palette.secondary.light}
                    strokeWidth={2}
                    fillOpacity="0.25"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={classes.serverOverviewElement}>
            <TypographyWrapper
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
              noWrap
            >
              54% / 31°С / 3.3 Ghz
            </TypographyWrapper>
            <div className={classes.serverOverviewElementChartWrapper}>
              <ResponsiveContainer height={50} width="99%">
                <AreaChart data={getRandomData(10)}>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.light}
                    strokeWidth={2}
                    fillOpacity="0.25"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className={classes.serverOverviewElement}>
            <TypographyWrapper
              color="text"
              colorBrightness="secondary"
              className={classes.serverOverviewElementText}
              noWrap
            >
              57% / 21°С / 3.3 Ghz
            </TypographyWrapper>
            <div className={classes.serverOverviewElementChartWrapper}>
              <ResponsiveContainer height={50} width="99%">
                <AreaChart data={getRandomData(10)}>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={theme.palette.warning.main}
                    fill={theme.palette.warning.light}
                    strokeWidth={2}
                    fillOpacity="0.25"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Widget>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Widget title="Revenue Breakdown" upperTitle className={classes.card}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ResponsiveContainer width="100%" height={144}>
                <PieChart>
                  <Pie
                    data={PieChartData}
                    innerRadius={30}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {PieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={theme.palette[entry.color].main}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.pieChartLegendWrapper}>
                {PieChartData.map(({ name, value, color }, index) => (
                  <div key={color} className={classes.legendItemContainer}>
                    <Dot color={color} />
                    <TypographyWrapper style={{ whiteSpace: "nowrap", fontSize: 12 }} >
                      &nbsp;{name}&nbsp;
                    </TypographyWrapper>
                    <TypographyWrapper color="text" colorBrightness="secondary">
                      &nbsp;{value}
                    </TypographyWrapper>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Grid item xs={12}>
        <Widget
          bodyClass={classes.mainChartBody}
          header={
            <div className={classes.mainChartHeader}>
              <TypographyWrapper
                variant="h5"
                color="text"
                colorBrightness="secondary"
              >
                Daily Line Chart
              </TypographyWrapper>
              <div className={classes.mainChartHeaderLabels}>
                <div className={classes.mainChartHeaderLabel}>
                  <Dot color="warning" />
                  <TypographyWrapper className={classes.mainChartLegentElement}>
                    Tablet
                  </TypographyWrapper>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                  <Dot color="primary" />
                  <TypographyWrapper className={classes.mainChartLegentElement}>
                    Mobile
                  </TypographyWrapper>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                  <Dot color="secondary" />
                  <TypographyWrapper className={classes.mainChartLegentElement}>
                    Desktop
                  </TypographyWrapper>
                </div>
              </div>
              <Select
                value={mainChartState}
                onChange={e => setMainChartState(e.target.value)}
                input={
                  <OutlinedInput
                    labelWidth={0}
                    classes={{
                      notchedOutline: classes.mainChartSelectRoot,
                      input: classes.mainChartSelect,
                    }}
                  />
                }
                autoWidth
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </div>
          }
        >
          <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <ComposedChart
              margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
              data={mainChartData}
            >
              <YAxis
                ticks={[0, 2500, 5000, 7500]}
                tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                stroke={theme.palette.text.hint + "80"}
                tickLine={false}
              />
              <XAxis
                tickFormatter={i => i + 1}
                tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                stroke={theme.palette.text.hint + "80"}
                tickLine={false}
              />
              <Area
                type="natural"
                dataKey="desktop"
                fill={theme.palette.background.light}
                strokeWidth={0}
                activeDot={false}
              />
              <Line
                type="natural"
                dataKey="mobile"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                dot={false}
                activeDot={false}
              />
              <Line
                type="linear"
                dataKey="tablet"
                stroke={theme.palette.warning.main}
                strokeWidth={2}
                dot={{
                  stroke: theme.palette.warning.dark,
                  strokeWidth: 2,
                  fill: theme.palette.warning.main,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Widget>
      </Grid>
      {mock.bigStat.map(stat => (
        <Grid item md={4} sm={6} xs={12} key={stat.product}>
          <BigStat {...stat} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Widget
          title="Support Requests"
          upperTitle
          noBodyPadding
          bodyClass={classes.tableWidget}
        >
          <Table data={mock.table} />
        </Widget>
      </Grid>
    </Grid>
  </>;
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
