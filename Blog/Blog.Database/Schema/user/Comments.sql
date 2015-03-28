CREATE TABLE [dbo].[Comments]
(
	[Id] INT NOT NULL IDENTITY(1,1), 
	[PostId] INT NOT NULL,
    [Email] NVARCHAR(50) NOT NULL , 
    [UserName] NVARCHAR(50) NOT NULL, 
    [CreatedDate] DATETIME NOT NULL DEFAULT getdate(), 
    [CreatedBy] INT NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    CONSTRAINT [PK_Comments] PRIMARY KEY ([Id]), 
    CONSTRAINT [FK_Comments_Posts] FOREIGN KEY ([PostId]) REFERENCES [Posts]([Id]),
	CONSTRAINT [FK_Comments_Users] FOREIGN KEY ([CreatedBy]) REFERENCES [Users]([Id]) 
)
