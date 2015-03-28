CREATE TABLE [dbo].[Posts]
(
	[Id] INT NOT NULL IDENTITY(1,1), 
	[Title] NVARCHAR(MAX) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL , 
    [Content] NVARCHAR(MAX) NOT NULL, 
	[Pv] INT NOT NULL DEFAULT 0, 
	[PublishedDate] DATETIME NOT NULL DEFAULT getdate(),
	[PublishedBy] INT NOT NULL,
    [CreatedDate] DATETIME NOT NULL DEFAULT getdate(), 
    [CreatedBy] INT NOT NULL, 
    [LastUpdatedDate] DATETIME NOT NULL DEFAULT getdate(), 
    [LastUpdatedBy] INT NOT NULL, 
    [IsDeleted] BIT NOT NULL DEFAULT 0, 
    CONSTRAINT [PK_Posts] PRIMARY KEY ([Id]), 
    CONSTRAINT [FK_Posts_Users_CreatedBy] FOREIGN KEY ([CreatedBy]) REFERENCES [Users]([Id]),
	CONSTRAINT [FK_Posts_Users_Published] FOREIGN KEY ([PublishedBy]) REFERENCES [Users]([Id]),
	CONSTRAINT [FK_Posts_Users_LastUpdatedBy] FOREIGN KEY ([LastUpdatedBy]) REFERENCES [Users]([Id]),
)
