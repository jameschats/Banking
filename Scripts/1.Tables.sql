USE [Banking]
GO

/****** Object:  Table [dbo].[tblAccount]    Script Date: 15-09-2019 23:22:16 ******/
IF OBJECT_ID('dbo.tblAccount', 'U') IS NOT NULL
DROP TABLE [dbo].[tblAccount]
GO

/****** Object:  Table [dbo].[tblAccount]    Script Date: 15-09-2019 23:22:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblAccount](
	[AccountId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[MonthlyCreditLimit] [float] NULL,
 CONSTRAINT [PK_tblAccount] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO



/****** Object:  Table [dbo].[tblPayment]    Script Date: 15-09-2019 23:22:36 ******/
IF OBJECT_ID('dbo.tblPayment', 'U') IS NOT NULL
DROP TABLE [dbo].[tblPayment]
GO

/****** Object:  Table [dbo].[tblPayment]    Script Date: 15-09-2019 23:22:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblPayment](
	[TransactionId] [bigint] IDENTITY(1,1) NOT NULL,
	[TransactionDate] [datetime] NOT NULL,
	[AccountId] [int] NOT NULL,
	[Amount] [float] NOT NULL,
 CONSTRAINT [PK_tblPayment] PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Banking]
GO



/****** Object:  Table [dbo].[tblUser]    Script Date: 15-09-2019 23:22:55 ******/
IF OBJECT_ID('dbo.tblUser', 'U') IS NOT NULL
BEGIN
DROP TABLE [dbo].[tblUser]
END
GO

/****** Object:  Table [dbo].[tblUser]    Script Date: 15-09-2019 23:22:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tblUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](254) NOT NULL,
	[PasswordHash] [varbinary](max) NULL,
	[PasswordSalt] [varbinary](max) NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_Active]  DEFAULT ((1)) FOR [Active]
GO



