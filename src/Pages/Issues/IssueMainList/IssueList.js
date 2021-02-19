import {
  Checkbox,
  Container,
  TableFooter,
  Typography,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  Paper,
} from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../../GlobalFeatures/Navbar/Navbar";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
//import TableSortLabel from "@material-ui/core/TableSortLabel";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  SortingArrow: {
    marginTop: "0",
  },
  content: {
    marginTop: "5rem",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down("md")]: {
      marginLeft: "3rem",
      width: "95%",
    },
    display: "inline-flex",
    flexDirection: "column",
  },
  TableRows: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#eaf0ea",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#eaeaf0",
    },
  },
  TableHead: {
    backgroundColor: "#c5c2c9",
  },
  BodyTableCells: {
    paddingRight: "2rem",
  },
}));

const IssueList = () => {
  const [Issues, setIssues] = useState(GetIssueData("ID", true, 10, 0));
  /*Issues JSON:
    {
        Column: //Column that is being sorted By
        Ascending: //Bool to indicate if the order is ASC or DESC
        Total: //The Number of Total Issues based on filter
        PageSize: //How many rows should be returned
        PageNumber: //On what page Are we
        Issues: [{}, {}] //Array of Issues

    }
*/

  //Quick calculations to be able to adjust column widths
  const ColumnWidths = [20, 30, 8, 10, 10];

  const SumWidths = ColumnWidths.reduce((a, b) => a + b, 0);

  const styles = useStyles();

  const SortData = (Column) => {
    if (Issues.Column == Column) {
      setIssues(GetIssueData(Column, !Issues.Ascending));
    } else setIssues(GetIssueData(Column, true));
  };

  return (
    <React.Fragment>
      <NavBar PageName="Issue Tracker">
        <div>
          <ListSubheader inset>Example Buttons</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </div>
      </NavBar>
      <Container maxWidth="xl" className={styles.content}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell>
                <Typography>Common Filters:</Typography>
              </TableCell>
              <TableCell align="right" width="20%">
                <Typography>
                  <Checkbox id="Closed" checked="true" />
                  Hide Closed
                </Typography>
              </TableCell>
              <TableCell align="right" width="20%">
                <Typography>
                  <Checkbox id="MyIssues" />
                  Show&nbsp;Issues Created&nbsp;By&nbsp;Me
                </Typography>
              </TableCell>
              <TableCell align="right" width="20%">
                <Typography>
                  <Checkbox id="MyResponsobilities" />
                  Show&nbsp;Issues with My&nbsp;Responsibility
                </Typography>
              </TableCell>
            </TableHead>
          </Table>
          <Table>
            <TableHead className={styles.TableHead}>
              <TableCell width={(100 * ColumnWidths[0]) / SumWidths + "%"}>
                <Button
                  onClick={() => {
                    SortData("Name");
                  }}
                >
                  <Typography variant="h6">Name</Typography>
                  {Issues.Column == "Name" &&
                    (Issues.Ascending ? (
                      <ArrowDownwardIcon className={styles.SortingArrow} />
                    ) : (
                      <ArrowUpwardIcon className={styles.SortingArrow} />
                    ))}
                </Button>
              </TableCell>

              <TableCell width={(100 * ColumnWidths[1]) / SumWidths + "%"}>
                <Button
                  onClick={() => {
                    SortData("Description");
                  }}
                >
                  <Typography variant="h6">Description</Typography>
                  {Issues.Column == "Description" &&
                    (Issues.Ascending ? (
                      <ArrowDownwardIcon className={styles.SortingArrow} />
                    ) : (
                      <ArrowUpwardIcon className={styles.SortingArrow} />
                    ))}
                </Button>
              </TableCell>

              <TableCell
                width={(100 * ColumnWidths[2]) / SumWidths + "%"}
                align="right"
              >
                <Button
                  onClick={() => {
                    SortData("Importance");
                  }}
                >
                  <Typography variant="h6" align="right">
                    Importance
                  </Typography>
                  {Issues.Column == "Importance" &&
                    (Issues.Ascending ? (
                      <ArrowDownwardIcon className={styles.SortingArrow} />
                    ) : (
                      <ArrowUpwardIcon className={styles.SortingArrow} />
                    ))}
                </Button>
              </TableCell>

              <TableCell width={(100 * ColumnWidths[3]) / SumWidths + "%"}>
                <Button
                  onClick={() => {
                    SortData("CurrentStep");
                  }}
                >
                  <Typography variant="h6">Current Step</Typography>
                  {Issues.Column == "CurrentStep" &&
                    (Issues.Ascending ? (
                      <ArrowDownwardIcon className={styles.SortingArrow} />
                    ) : (
                      <ArrowUpwardIcon className={styles.SortingArrow} />
                    ))}
                </Button>
              </TableCell>

              <TableCell width={(100 * ColumnWidths[4]) / SumWidths + "%"}>
                <Button
                  onClick={() => {
                    SortData("Progress");
                  }}
                >
                  <Typography variant="h6">Progress</Typography>
                  {Issues.Column == "Progress" &&
                    (Issues.Ascending ? (
                      <ArrowDownwardIcon className={styles.SortingArrow} />
                    ) : (
                      <ArrowUpwardIcon className={styles.SortingArrow} />
                    ))}
                </Button>
              </TableCell>
            </TableHead>
            <TableBody>
              {Issues.Issues.map((Issue) => (
                <TableRow key={Issue.ID} className={styles.TableRows}>
                  <TableCell className={styles.BodyTableCells}>
                    {Issue.Name}
                  </TableCell>

                  <TableCell className={styles.BodyTableCells}>
                    {Issue.Description}
                  </TableCell>

                  <TableCell align="center" className={styles.BodyTableCells}>
                    {Issue.Importance}
                  </TableCell>

                  <TableCell align="center" className={styles.BodyTableCells}>
                    {Issue.CurrentStep}
                  </TableCell>

                  <TableCell className={styles.BodyTableCells}>
                    {Issue.Closed
                      ? "Closed On " + Issue.Closed.toString("yyyy-MM-dd")
                      : "Active"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={Issues.Total}
                rowsPerPage={Issues.PageSize}
                page={Issues.PageNumber}
                onChangePage={() => {
                  setIssues(
                    GetIssueData(
                      Issues.Column,
                      Issues.Ascending,
                      Issues.PageSize,
                      Issues.PageNumber
                    )
                  );
                }}
                onChangeRowsPerPage={() => {
                  setIssues(
                    GetIssueData(
                      Issues.Column,
                      Issues.Ascending,
                      Issues.PageSize,
                      Issues.PageNumber
                    )
                  );
                }}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
};

export default IssueList;

const GetIssueData = (Column, Ascending, PageSize, PageNumber) => {
  console.log(Column, Ascending ? "ASC" : "DESC");
  if (document.getElementById("MyResponsobilities"))
    console.log(
      document.getElementById("MyResponsobilities").checked,
      document.getElementById("MyIssues").checked,
      document.getElementById("Closed").checked
    );

  console.log(PageSize, PageNumber);
  return {
    Column: Column,
    Ascending: Ascending,
    Total: 5,
    PageSize: PageSize,
    PageNumber: PageNumber,
    Issues: [
      {
        ID: 1,
        Name: "name1",
        Description: "I am describing this issue",
        Importance: 3,
        CurrentStep: "Evaluate",
        Closed: "2020-12-26",
      },
      {
        ID: 2,
        Name: "name2",
        Description: "I am describing this issue",
        Importance: 2,
        CurrentStep: "Preparation",
        Closed: null,
      },
      {
        ID: 3,
        Name: "name3",
        Description: "I am describing this issue",
        Importance: 4,
        CurrentStep: "Execution",
        Closed: null,
      },
      {
        ID: 4,
        Name: "name4",
        Description: "I am describing this issue",
        Importance: 5,
        CurrentStep: "Approval",
        Closed: "20011-01-20",
      },
      {
        ID: 5,
        Name: "name6",
        Description: "I am describing this issue",
        Importance: 1,
        CurrentStep: "Registration",
        Closed: null,
      },
    ],
  };
};
