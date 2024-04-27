import Grid from "@mui/material/Grid";
import Cell from "./Cell";
import rat from "./rat.png";
import cheese from "./cheese.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import classes from "./Maze.module.css";

function Maze() {
  const rows = 4;
  const columns = 4;
  const matrix = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));
  matrix[2][0] = 1;
  matrix[2][1] = 1;
  // matrix[2][2] = 1;
  // matrix[2][3] = 1;

  const paths = calculatePaths(matrix, 0, 0, rows, columns);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Box p={8}>
          <Grid container justify="center">
            <Grid
              key="0"
              style={{ backgroundColor: "black" }}
              container
              direction="row"
              spacing={0}
              item
              sm={3}
            >
              {loadCells(matrix, rows, columns, 0, [])}
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Typography gutterBottom variant="subtitle1">
              Initial Maze
            </Typography>
          </Grid>
        </Box>
        <Grid container justify="center">
          <Typography gutterBottom variant="subtitle1">
            Total Paths = {paths.length}
          </Typography>
        </Grid>
        {paths.map((path, index) => (
          <Grid
            key={(index + 1).toString()}
            style={{ backgroundColor: "black" }}
            container
            direction="row"
            spacing={0}
            item
            sm={3}
          >
            {loadCells(matrix, rows, columns, index + 1, path)}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function calculatePaths(matrix, i, j, rows, columns) {
  const paths = [];
  const visited = Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));
  calculatePathsUtil(matrix, visited, i, j, rows, columns, [], paths);
  return paths;
}

function calculatePathsUtil(
  matrix,
  visited,
  i,
  j,
  rows,
  columns,
  currentPath,
  paths
) {
  if (i < 0 || i >= rows || j < 0 || j >= columns) return;
  if (matrix[i][j] === 1 || visited[i][j] === 1) return;
  if (i === rows - 1 && j === columns - 1) {
    paths.push([...currentPath]);
    visited[i][j] = 0;
    return;
  }
  visited[i][j] = 1;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  for (const [dx, dy] of directions) {
    const x = i + dx;
    const y = j + dy;
    currentPath.push([x, y]);
    calculatePathsUtil(
      matrix,
      visited,
      x,
      y,
      rows,
      columns,
      currentPath,
      paths
    );
    currentPath.pop();
  }

  visited[i][j] = 0;
}

function loadCells(matrix, rows, columns, gIndex, path) {
  const cells = [];

  matrix.forEach((row, rIndex) => {
    row.forEach((cell, cIndex) => {
      let color;
      let content;

      if (cell === 1) {
        color = "red";
      } else if (path.find(([x, y]) => x === rIndex && y === cIndex)) {
        color = "green";
      } else if (rIndex === 0 && cIndex === 0) {
        color = "white";
        content = <img style={{ width: "100%" }} alt="rat" src={rat} />;
      } else if (rIndex === rows - 1 && cIndex === columns - 1) {
        color = "white";
        content = <img style={{ width: "100%" }} alt="cheese" src={cheese} />;
      } else {
        color = "white";
      }

      cells.push(
        <Cell key={`${gIndex}-${rIndex}-${cIndex}`} color={color}>
          <Box height="50px">{content}</Box>
        </Cell>
      );
    });
  });

  return cells;
}

export default Maze;
