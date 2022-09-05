import { Card, CardContent, Skeleton } from "@mui/material";

const RecipeCardSkeleton = () => {
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Skeleton variant="rectangular" animation="wave" height={40}/>
          <br />
          <Skeleton variant="rectangular" animation="wave" height={150} /> 
          <br />
          <Skeleton variant="rectangular" animation="wave" height={15} /> 
          <br />
          <Skeleton variant="rectangular" animation="wave" height={15} width={250} /> 
        </CardContent>
      </Card>
    </>
  )
}

export default RecipeCardSkeleton;