USE [Banking]
GO

/****** Object:  StoredProcedure [dbo].[prcGetPerformers]    Script Date: 15-09-2019 23:24:52 ******/
DROP PROCEDURE [dbo].[prcGetPerformers]
GO

/****** Object:  StoredProcedure [dbo].[prcGetPerformers]    Script Date: 15-09-2019 23:24:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[prcGetPerformers](@FromDate      DATETIME, 
                                 @ToDate        DATETIME, 
                                 @SortColumn    VARCHAR(20), 
                                 @SortDirection VARCHAR(5)) 
--EXEC prcGetPerformers '2019-09-10','2019-09-16', 'amount', 'desc' 
--EXEC prcGetPerformers '2019-09-10','2019-09-15', 'usage', 'desc' 
AS 
  BEGIN 
      DECLARE @sql AS NVARCHAR(4000) 

      SET @sql = 'SELECT CONVERT(nvarchar(max), [b].[AccountId]) AS [AccountId], [b].[Name],  
					 CAST((SUM([a].[Amount]) / [b].[MonthlyCreditLimit]) * 100E0 AS DECIMAL(18,2)) AS Usage,
					 CAST( SUM([a].[Amount]) AS DECIMAL(18,2)) AS [Amount], 
					 CAST( [b].[MonthlyCreditLimit] AS DECIMAL(18,2)) AS MonthlyCreditLimit       
				 FROM [tblPayment] AS [a]       
				 INNER JOIN [tblAccount] AS [b] ON [a].[AccountId] = [b].[AccountId]  
				  WHERE (convert(Datetime,[a].[TransactionDate]) >= ''' 
                 + CONVERT(NVARCHAR(24), @FromDate, 121) 
                 + ''')        AND (convert(Datetime,[a].[TransactionDate]) <= ''' 
                 + CONVERT(NVARCHAR(24), convert(datetime,@ToDate+' 23:59:59'), 121) 
                 + 
      ''')        GROUP BY [b].[Name], [b].[AccountId], [b].[MonthlyCreditLimit]' 

      IF @SortColumn = '' 
          OR @SortColumn IS NULL 
        SET @sql = @sql + ' ORDER BY Usage DESC' 

      IF @SortColumn <> '' 
         AND @SortColumn IS NOT NULL 
        SET @sql = @sql + ' ORDER BY ' + @SortColumn 

      IF @SortDirection <> '' 
         AND @SortDirection IS NOT NULL 
        SET @sql = @sql + ' ' + @SortDirection 

      --PRINT @sql 

      EXEC Sp_executesql 
        @sql 
  END 
GO


