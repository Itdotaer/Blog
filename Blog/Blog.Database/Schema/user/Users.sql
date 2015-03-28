CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL IDENTITY(1,1), 
    [Email] NVARCHAR(50) NOT NULL , 
    [UserName] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(50) NOT NULL, 
    [CreatedDate] DATETIME NOT NULL DEFAULT getdate(), 
    [CreatedBy] INT NOT NULL, 
    [LastUpdatedDate] DATETIME NOT NULL DEFAULT getdate(), 
    [LastUpdatedBy] INT NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id]) 
)
